jQuery editnibble
==================
This is an extremely simple plugin to allow you to edit
any element in the DOM.

Unlike other editable plugins, this does not do any immediate Ajax
submits, and does not destroy the form fields after editing.

In other words, you get those values submited with the form (if you
wrap your editable elements in a form).

Usage
=====
The markup:

    <form>
        <div id="field1" class="editable">This is editable</div>
        <div id="another_field" class="editable"><strong>And this</strong>, too</div>
    </form>


The code:

     $(".editable").editnibble();

Tips
====
* To hide all the editors when the user hits escape:

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape
            $(".editable").editnibble('hideAllEditors');
        }
    });


Copyright and License
=====================
Copyright (c) 2012 Mark A. Stratman

Dual licensed under the MIT and GPL licenses:

* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
