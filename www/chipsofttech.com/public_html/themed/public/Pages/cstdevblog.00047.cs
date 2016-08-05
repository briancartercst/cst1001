CST Portal Dev Blog
admin|2007/10/13 17:04:17
##PAGE##
<h1>Welcome to the CST Portal Development Blog!</h1>

In this blog, we keep track of all the changes we made for the portal blog.

{TOC}


==Searching==
Added Search to sidebar:



For reference, I modified the SEARCHBOX case statement in <emp>\Core\Formatter.cs</emp> and changed 

Code: 
... document.location = 'Search.aspx?Query=' ... 

to 
Code: 
... document.location = 'Search.aspx?FullText=1&Query=' ... 


==Keep Alive==

'''Updated file: StartupTools.cs'''
<br />
public static void Startup() { <br/> 
 ...<br />
  <b>KeepAliveInit();<b><br/> 
} <br /><br/> 

Add Init Proc:<br/>
<img src="images/dev/keepaliveinit.jpg" alt="keepaliveinit()" />

<br /><br/>
Add Keep Alive Proc:<br/> 
[imageleft||images/dev/keepalive.jpg]
<br/>


