
'use strict';

module.exports = function(opts, modified, total, next) {
    modified.forEach(function(file) {
        if (file.isHtmlLike) {
            var content = file.getContent();

            content = content.replace(/(<script(\s+type=["']text\/javascript["'])?>([\s\S]*?)<\/script>\s*){2,}/, function(str) {
                var single = /<script(\s+type=["']text\/javascript["'])?>([\s\S]*?)<\/script>/g,
                    code = [],
                    match = null;
                while (match = single.exec(str)) {
                    code.push(match[2]);
                }
                return '<script>' + code.join(';\n') + '</script>\n';
            });

            content = content.replace(/(<style(\s+type=["']text\/css["'])?>([\s\S]*?)<\/style>\s*){2,}/, function(str) {
                var single = /<style(\s+type=["']text\/css["'])?>([\s\S]*?)<\/style>/g,
                    code = [],
                    match = null;
                while (match = single.exec(str)) {
                    code.push(match[2]);
                }
                return '<style>' + code.join('\n') + '</style>\n';
            });

            file.setContent(content);
        }
    });

    next();
};

