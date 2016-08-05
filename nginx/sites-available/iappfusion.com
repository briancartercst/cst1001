server {
 	listen 80;
	server_name iappfusion.com *.iappfusion.com;
 	return 301 $scheme://www.iappfusion.com$request_uri;
} 

server {
	listen   80; ## listen for ipv4; this line is default and implied
	root /var/www/iappfusion.com/public_html;
	index index.html index.htm;
	server_name www.iappfusion.com;

	location / {
		try_files $uri $uri/ /index.php?q=$uri&$args;
	}

	error_page 404 /404.html;
	location = /50x.htm {
		root /usr/share/nginx/www;
	}

}
