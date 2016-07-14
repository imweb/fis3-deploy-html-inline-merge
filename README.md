# fis3-deploy-html-inline-merge

fis3 合并html中的style/script inline标签

## Usage

```js
// fis-conf.js
fis.media('dist')
    .match('*.html', {
        deploy: [
            fis.plugin('html-inline-merge'),
            fis.plugin('local-deliver', {
                to: '../dist'
            })
        ]
    });
```

