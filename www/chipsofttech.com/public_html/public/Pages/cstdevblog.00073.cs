﻿CST Portal Dev Blog
briancarter|2007/10/13 18:53:10
##PAGE##
<div class="boxwide">
Welcome to the CST Portal Development Blog

In this blog, we keep track of all the changes we made for the portal blog.

{TOC}
<p>&nbsp;<p/><p>&nbsp;<p/>
</div>

==Searching==
<div class="boxborder">
<p>
Added Search to sidebar:
<br/>
<img src="images/dev/quicksearch.jpg" alt="quicksearch" />
<p>&nbsp;</p>
For reference, I modified the SEARCHBOX case statement in <b>\Core\Formatter.cs</b> and changed 

Code: 
<esc>... document.location = 'Search.aspx?Query=' ...</esc>

to 
Code: 
<esc>... document.location = 'Search.aspx?FullText=1&Query=' ... </esc>

<b>Final Result:</b>

<img src="images/dev/quicksearchpic.jpg" alt="quicksearch" />
<p>
</div>

==Keep Alive==
<div class="boxwide">
<p>
Tired of hosted aspx applications ending session?  I added in a keep alive that hits default.aspx and admin.aspx.
</p>
<p>&nbsp;</p>
<p>
<b>Updated file: StartupTools.cs</b>
<br />
public static void Startup() { <br/> 
 ...<br />
  <font color="red">KeepAliveInit();</font><br/> 
} <br /><br/> 
</p>
<p>
Add Init Proc:<br/>
<img src="images/dev/keepaliveinit.jpg" alt="keepaliveinit()" />
</p>
<p>Add Keep Alive Proc:<br/> 
[imageleft||images/dev/keepalive.jpg]
</p>
</div>


