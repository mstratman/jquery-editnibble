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

Options
=======
These options can be passed to the `editnibble()` function. e.g. `$(".editable").editnibble({ editorClass: 'editor-form-element' });`

        editorWrapperClass:   'editor-wrapper',
        editorClass:          'editor-form-element',
        contentsWrapperClass: 'content-wrapper',
        finishEditingEvent:   'blur', //e.g. blur, change, dblclick, click.
        hideEditorOnFinish:   true,
        allowMultipleEditors: false,
        preCreateEditors:     true   // Useful if you want the submitted form to contain
                                     // all the editable fields, even if they were never
                                     // edited by the user.

Tips
====
To hide all the editors when the user hits escape:

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape
            $(".editable").editnibble('hideAllEditors');
        }
    });

To get the textarea or input form element (for example, if you wanted
to turn it into a rich text editor with ckeditor or another plugin),
retrieve it by its class (`editor-form-element` or whatever you set it
to with the `editorClass` option):

    // e.g.
    $(".editable .editor-form-element").ckeditor();


Copyright and License
=====================
Copyright (c) 2012 Mark A. Stratman

Dual licensed under the MIT and GPL licenses:

* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
