CST Portal Dev Blog
admin|2007/10/13 17:09:25
##PAGE##
<h1>Welcome to the CST Portal Development Blog!</h1>

In this blog, we keep track of all the changes we made for the portal blog.

{TOC}


<h2>Searching</h2>
<p>&nbsp;</p>
Added Search to sidebar:<br/>
<img src="images/dev/quicksearch.jpg" alt="quicksearch" />
<br/><br/>
For reference, I modified the SEARCHBOX case statement in <b>\Core\Formatter.cs</b> and changed 

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


