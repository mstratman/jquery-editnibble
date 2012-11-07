# jQuery editnibble

This is an extremely simple plugin to allow you to edit
any element in the DOM.

Visit the webpage for an example:
http://mstratman.github.com/jquery-editnibble/

Unlike other editable plugins, this does not do any immediate Ajax
submits, and does not destroy the form fields after editing.

In other words, you get those values submited with the form (if you
wrap your editable elements in a form).

## Usage
The markup:

```html
    <form>
        <div id="field1" class="editable">This is editable</div>
        <div id="another_field" class="editable"><strong>And this</strong>, too</div>
    </form>
```

The code:

```javascript
     $(".editable").editnibble();
```

## Options
These options can be passed to the `editnibble()` function. e.g. `$(".editable").editnibble({ editorClass: 'editor-form-element' });`

```javascript
        editorWrapperClass:   'editor-wrapper',
        editorClass:          'editor-form-element',
        contentsWrapperClass: 'content-wrapper',
        finishEditingEvent:   'blur', //e.g. blur, change, dblclick, click.
        hideEditorOnFinish:   true,
        selectOnEdit:         false, // should we highlight the text when the editor appears?
        allowMultipleEditors: false,
        onHide: function(textVal, context) { return textVal }, // Return something else to change it (e.g. to html-escape the contents)
        preCreateEditors:     true   // Useful if you want the submitted form to contain
                                     // all the editable fields, even if they were never
                                     // edited by the user.
```

## Methods

### hideAllEditors

```javascript
    $(".editable").editnibble('hideAllEditors')
```

This stops editing, and hides all the editors, replacing them with
their rendered content.

## Tips

### Escape key to stop editing

To hide all the editors when the user hits escape:

```javascript
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape
            $(".editable").editnibble('hideAllEditors');
        }
    });
```

### Indicating something is editable

When the user hovers over an editable element, it is a good idea to
give them a clear indication that it is editable.  A really simple 
method is to change the background color and show a tooltip.

For example, you might do the following:

```html
    <style type="text/css">
        .editable {
            background-color:#FFFFFF;
            cursor:text;
        }
        .editable:hover {
            background-color:#FFFFCC;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function() {
            $(".editable").attr('title', 'Click to edit');
            $(".editable").editnibble();
        });
    </script>
```

### Multi-line textarea vs single-line input text box

If the editable element has a `display` value of `inline`, editnibble
will provide an `input` tag (a one-line text box).  Otherwise, it
will give you a multi-line `textarea` box.

### Retrieving textarea or input

To get the textarea or input form element (for example, if you wanted
to turn it into a rich text editor with ckeditor or another plugin),
retrieve it by its class (`editor-form-element` or whatever you set it
to with the `editorClass` option):

```javascript
    // e.g.
    $(".editable .editor-form-element").ckeditor();
```


## Copyright and License
Copyright (c) 2012 Mark A. Stratman

Dual licensed under the MIT and GPL licenses:

* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
