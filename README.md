
## Setup 
If gulp is not installed, run the following command    
``npm install --global gulp-cli`` Then run yarn or npm to install dependencies  
``yarn install`` or ``npm install``  
  ## Usage - Your browser will automatically be opened and directed to the browser-sync proxy address. Now that gulp serve is running, any changes in the /app directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.    
```    
$ gulp serve    
```    
- To build project as production use `gulp` command. An dist directory will be created, it contain all js, css, html and images file optimized.    
```    
$ gulp    
```  
  
## Deploy  
To deploy to github page, add  
``<base href="dist/"/>``  
into `index.html` after `<head>` then push `index.html` and `dist` folder to github
