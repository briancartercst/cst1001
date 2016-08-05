server {
 	listen 80;
	server_name katrecall.com *.katrecall.com;
 	return 301 $scheme://www.katrecall.com$request_uri;
} 

server {
	listen   80; ## listen for ipv4; this line is default and implied
	root /var/www/katrecall.com/public_html;
	index index.php index.html index.htm;
	server_name www.katrecall.com;

	location / {
		try_files $uri $uri/ /index.php?q=$uri&$args;
	}

	error_page 404 /404.html;
	location = /50x.htm {
		root /usr/share/nginx/www;
	}

	location ~ \.php$ {
		fastcgi_pass unix:/var/run/php5-fpm.sock;
		fastcgi_index index.php;
		include fastcgi_params;
	}
}
