/*
 * jquery.editnibble.js
 * https://github.com/mstratman/jquery-editnibble
 *
 * Copyright (c) 2012 Mark A. Stratman
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
var __jquery_editnibble_last_id = 1;
function JqueryEditNibble(targets, options) {
    this.targets = targets;
    this.opt = options;

    var _init = function($this) {
        return $this.targets.each(function() {
            _make_editable($this, $(this));
        });
    };

    var _make_editable = function($this, target) {
        if ($this.opt.preCreateEditors) {
            _create_editor($this, target);
        }

        target.click(function() {
            var element = $(this);

            if (! element.data('has-editor')) {
                _create_editor($this, element);
            }

            // Is the editor already visible?
            if (element.find('.' + $this.opt.editorWrapperClass + ':visible').size()) {
                return;
            }

            _show_editor($this, element);

            if ($this.opt.selectOnEdit) {
                var editor = $("." + $this.opt.editorWrapperClass, element).find('.' + $this.opt.editorClass);
                editor.select();
            }
        });
    };

    var _show_editor = function($this, element) {
        if (! $this.opt.allowMultipleEditors) {
            _hide_all_editors($this);
        }

        var contentWrapper = $("." + $this.opt.contentsWrapperClass, element);
        var editorWrapper = $("." + $this.opt.editorWrapperClass, element);
        var editor = editorWrapper.find('.' + $this.opt.editorClass);

        var contents = contentWrapper.html();
        editor.val( $.trim(contents) );

        contentWrapper.hide();
        editorWrapper.show();

        editor.focus();
    };

    var _hide_all_editors = function($this) {
        $("." + $this.opt.editorWrapperClass + ":visible").each(function() {
            _hide_editor($this, $(this).parent());
        });
    };
    var _hide_editor = function($this, element) {
        var contents = $("." + $this.opt.editorWrapperClass, element).find('.' + $this.opt.editorClass).val();
        
        $("." + $this.opt.contentsWrapperClass, element).html(contents);

        $("." + $this.opt.editorWrapperClass, element).hide();
        $("." + $this.opt.contentsWrapperClass, element).show();
    };

    var _create_editor = function($this, element) {
        if (typeof element.attr('id') == 'undefined') {
            element.attr('id', 'editnibble_' + __jquery_editnibble_last_id);
            __jquery_editnibble_last_id++;
        }

        var wrap_with = 'div';
        var editor;
        switch (element.css('display')) {
            case "table-cell":
                editor = $( document.createElement("textarea") );
                break;
            case "inline":
                editor = $( document.createElement("input") ).attr("type", "text");
                wrap_with = 'span';
                break;
            default:
                editor = $( document.createElement("textarea") );
                break;
        }

        // Wrap existing contents so we can more effectively show
        // and hide them.
        var contents = element.html();
        element.html(
            $(document.createElement(wrap_with))
            .addClass($this.opt.contentsWrapperClass)
            .append(contents)
        );
        element.append(
            $(document.createElement(wrap_with))
            .addClass($this.opt.editorWrapperClass)
            .append(
                editor
                .attr('name', element.attr('id'))
                .addClass($this.opt.editorClass)
                .val(contents)
            )
            .hide()
        );

        if ($this.opt.finishEditingEvent) {
            editor.bind($this.opt.finishEditingEvent, function() {
                if ($this.opt.hideEditorOnFinish) {
                    _hide_editor($this, element);
                }
            });
        }

        element.data('has-editor', true);
    };


    /* Public methods */

    JqueryEditNibble.prototype.hideAllEditors = function() {
        _hide_all_editors(this);
    };

    _init(this);
}

(function($) {
    $.fn.editnibble = function(method) {
        var args = arguments;
        var rv = undefined;
        var all = this.each(function() {
            var obj = $(this).data('editnibble');
            if (typeof method == 'object' || ! method || ! obj) {
                var options = $.extend({}, $.fn.editnibble.defaults, method || {});
                obj = new JqueryEditNibble($(this), options);
                $(this).data('editnibble', obj);
            } else {
                if (typeof JqueryEditNibble.prototype[method] == "function") {
                    rv = JqueryEditNibble.prototype[method].apply(obj, Array.prototype.slice.call(args, 1));
                    return rv;
                } else {
                    $.error('Method ' +  method + ' does not exist in editnibble plugin');
                }
            }
        });
        if (rv == undefined) {
            return all;
        } else {
            return rv;
        }
    };

    $.fn.editnibble.defaults = {
        editorWrapperClass: 'editor-wrapper',
        editorClass: 'editor-form-element',
        contentsWrapperClass: 'content-wrapper',
        finishEditingEvent: 'blur', //e.g. blur, change, dblclick, click.
        selectOnEdit : false,
        hideEditorOnFinish: true,
        allowMultipleEditors: false,
        preCreateEditors: true   // Useful if you want the submitted form to contain
                                 // all the editable fields, even if they were never
                                 // edited by the user.
    };

})(jQuery);
