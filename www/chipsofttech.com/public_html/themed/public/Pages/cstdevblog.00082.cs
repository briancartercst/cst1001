CST Portal Dev Blog
admin|2007/10/20 09:31:40
##PAGE##
<div class="boxwide">
Welcome to the CST Portal Development Blog

In this blog, we keep track of all the changes we made for the portal blog.

{TOC}
<br /> <br /></div>

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
* note calls to default and admin aspx pages to keep application alive<br/>
<img src="images/dev/keepalive.jpg" alt="keepalive()" />
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
* note calls to default and admin aspx pages to keep application alive<br/>
<img src="images/dev/keepalive.jpg" alt="keepalive()" />
</p>
</div>

<br/>

==Sitemap==
Added sitemap.aspx to generate a sitemap for CST.  Updated Google with the sitemap information at:

https://www.google.com/webmasters/tools/siteoverview

Source:<br \>
http://www.hookedonlinq.com/Default.aspx?Page=ScrewturnSitemap&AspxAutoDetectCookieSupport=1



