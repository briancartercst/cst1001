CST Portal Dev Blog
admin|2007/10/13 16:53:24
##PAGE##
<h1>Welcome to the CST Portal Development Blog!</h1>

In this blog, we keep track of all the changes we made for the portal blog.

{TOC}


==Searching==
Added Search to sidebar:

<small>'''Quick Search'''</small>{BR}
{SEARCHBOX}{BR}
<small>[Search.aspx?FullText=1|Advanced Search &raquo;]</small>
]]>

For reference, I modified the SEARCHBOX case statement in \Core\Formatter.cs and changed 

Code: 
... document.location = 'Search.aspx?Query=' ... 

to 
Code: 
... document.location = 'Search.aspx?FullText=1&Query=' ... 


==Keep Alive==

'''Updated file: StartupTools.cs'''
{BR}
public static void Startup() { {BR} 
 ...{BR}
  ''KeepAliveInit();''{BR} 
} {BR}{BR} 

Add Init Proc:{BR} 
[imageleft||images/dev/keepaliveinit.jpg]

<br /><br />

Add Keep Alive Proc:{BR} 
[imageleft||images/dev/keepalive.jpg]



