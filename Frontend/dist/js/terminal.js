var terminalElement = $(".terminal")[0];
    var dialogue = document.getElementsByClassName("dialogue")[0];
    1 || (function(o) {
        var open = false;
        Object.defineProperty(o, "open", {
            get: function() { return o.classList.contains("open"); },
            set: function(i) { o.classList.toggle("open", !!i); }
        });
    }(dialogue));

    function snakeText(from, to, refreshRate, charAmount, autoScroll) {
        var fromText, toText, l, i,
            refreshRate = refreshRate || 20,
            charAmount = charAmount || 1;
        if (3 === from.nodeType) fromText = from;
        else
            for (i = l = from.childNodes.length - 1; i >= 0; --i)
                if (3 === from.childNodes[i].nodeType) {
                    fromText = from.childNodes[i];
                    break;
                }
        if (!fromText) throw new ArgumentError("Source object is neither a text node or element containing any text nodes.");
        if (3 === to.nodeType) toText = to;
        else
            for (i = l = to.childNodes.length - 1; i >= 0; --i)
                if (3 === to.childNodes[i].nodeType) {
                    toText = to.childNodes[i];
                    break;
                }

        toText = toText || to.appendChild(document.createTextNode(""));
        var interval = setInterval(function() {
            var from = fromText.data;
            if (!from.length) return clearInterval(interval);
            toText.data += from.substr(0, charAmount);
            fromText.data = from.substr(charAmount);

            if (autoScroll && ($('.terminalwrapper').get(0).scrollTop > 20))
                console.log($('.terminalwrapper').get(0).scrollTop)
            $('.terminalwrapper').animate({
                scrollTop: $('.terminalwrapper').get(0).scrollHeight
            }, 0);
        }, refreshRate);
        return interval;

        setTimeout(function(){ alert("Hello"); }, 12000);
    }

   stringData = "CLEAN --- a utility to filter text files.\r\n; This program removes all control codes except\r\n; for line feeds, carriage returns, and form\r\n; feeds, strips off the high bit of all characters,\r\n; and expands tabs.  Can be used to make a Wordstar\r\n; file acceptable for other screen or line editors,\r\n; and vice versa.\r\n;\r\ncr   equ 0dh     ;ASCII carriage return\r\nlf    equ 0ah     ;ASCII line feed\r\nff  equ 0ch     ;ASCII form feed\r\neof equ 01ah        ;End of file marker\r\ntab  equ 09h     ;ASCII tab character\r\ncommand equ 80h     ;buffer for command tail\r\nblksize equ 1024        ;blocking/deblocking size\r\ncseg   segment para public 'CODE'\r\n  assume  cs:cseg,ds:data,es:data,ss:stack\r\nclean   proc    far     ;entry point from PC-DOS\r\n    push    ds      ;save DS:0000 for final\r\n xor ax,ax       ;return to PC-DOS\r\n   push    ax\r\n  mov ax,data     ;make our data segment\r\n  mov es,ax       ;addressable via ES register\r\n    call    infile      ;get path and file spec.\r\n                ;for input file\r\n mov ax,es       ;set DS=ES for remainder\r\n    mov ds,ax       ;of program\r\n jnc clean1      ;jump, got acceptable name\r\n  mov dx,offset msg4  ;missing or illegal filespec,\r\n   jmp clean9      ;print error message and exit.\r\nclean1:   call    outfile     ;set up output file name\r\n    call    open_input  ;now try to open input file\r\n jnc clean2      ;jump,opened input ok\r\n   mov dx,offset msg1  ;open of input file failed,\r\n jmp clean9      ;print error msg and exit.\r\nclean2:\r\n   call    open_output ;try to open output file.\r\n   jnc clean25     ;jump,opened ok\r\n mov dx,offset msg2  ;open of output file failed,\r\n    jmp clean9      ;print error message and exit.\r\nclean25:          ;set up buffers\r\n call    init_buffs\r\n  call    sign_on     ;print ident and file names\r\n \r\n                ;files successfully opened,     \r\nclean3:             ;now filter the file.  \r\n call    get_char    ;read 1 character from input.\r\n   and al,07fh     ;strip off the high bit\r\n cmp al,20h      ;is it a control code?\r\n  jae clean4      ;no,write it to new file    \r\n                ;yes it is control code,\r\n    cmp al,eof      ;is it end of file marker?\r\n  je  clean6      ;yes,jump to close files.\r\n   cmp al,tab      ;is it a tab command?\r\n   jz  clean5      ;yes,jump to special processing.\r\n    cmp al,cr       ;if control code other than\r\n je  clean35     ;tab or end-of-file mark, throw \r\n    cmp al,ff       ;it away unless it is a \r\n    je  clean35     ;form feed, carriage return,\r\n    cmp al,lf       ;or line feed.\r\n  jne clean3      \r\nclean35:            ;If it is one of those three,\r\n   mov column,0    ;incidentally initialize\r\n    jmp clean45     ;column count for tab processor.\r\nclean4:             ;count alphanumeric chars. sent.\r\n    inc column\r\nclean45:          ;write this character to \r\n   call    put_char    ;output file,\r\n   jnc clean3      ;if CY not set, write was\r\n               ;ok so go get next char.\r\nclean47:\r\n    call    close_input ;if CY set, disk is full\r\n    call    close_output    ;so close files and exit\r\n    mov dx,offset msg5  ;with error message.\r\n    jmp clean9\r\nclean5:               ;process tab character\r\n  mov ax,column   ;let DX:AX=column count\r\n cwd\r\n mov cx,8        ;divide it by eight...\r\n  idiv    cx\r\n  sub cx,dx       ;remainder is in DX.\r\n    add column,cx   ;update column pointer.\r\nclean55:         ;8 minus the remainder \r\n push    cx      ;gives us the number of\r\n mov al,20h      ;spaces to send out to\r\n  call    put_char    ;move to the next tab position\r\n  pop cx      ;restore space count\r\n    jc  clean47     ;jump if disk is full\r\n   loop    clean55\r\n jmp short clean3    ;get next character \r\nclean6:             ;end of file detected,\r\n  call    put_char    ;write end-of-file marker,\r\n  jc  clean47     ;jump if disk was full\r\n  call    flush_buffs ;write remaining data to disk\r\n   jc  clean47     ;if CY set,disk was full\r\n                ;otherwise file was written ok  \r\n    call    close_input ;close input and output \r\n    call    close_output    ;files.\r\n mov dx,offset msg3  ;addr of success message,\r\nclean9:                ;print message and return\r\n   mov ah,9        ;control to PC-DOS\r\n  int 21h\r\n ret\r\nclean    endp\r\ninfile  proc    near        ;process name of input file\r\n\r\n\r\n restart successfull ! "