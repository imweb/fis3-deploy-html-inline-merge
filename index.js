
'use strict';

var script = /<script(\s+type=["']text\/javascript["'])?>([\s\S]*?)<\/script>/g,
    style = /<style(\s+type=["']text\/css["'])?>([\s\S]*?)<\/style>/g;

module.exports = function(opts, modified, total, next) {
    modified.forEach(function(file) {
        if (file.isHtmlLike) {
            var content = file.getContent();

            content = content.replace(new RegExp('(' + script.source + '\\s*)+', 'g'), function(str) {
                var code = [],
                    match = null;
                while (match = script.exec(str)) {
                    code.push(match[2]);
                }
                return '<script>' + code.join(';\n') + '</script>\n';
            });

            content = content.replace(new RegExp('(' + style.source + '\\s*)+', 'g'), function(str) {
                var code = [],
                    match = null;
                while (match = style.exec(str)) {
                    code.push(match[2]);
                }
                return '<style>' + code.join('\n') + '</style>\n';
            });

            file.setContent(content);
        }
    });

    next();
};

