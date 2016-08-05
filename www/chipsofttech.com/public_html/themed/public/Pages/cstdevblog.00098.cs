CST Portal Dev Blog
admin|2007/10/20 10:28:09
##PAGE##
<div class="boxwide">
Welcome to the CST Portal Development Blog

In this blog, we keep track of all the changes we made for the portal blog.

{TOC}<br /> <br />
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
} <br /><br /> 
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

<br /> <br />


==Sitemap==
Added sitemap.aspx to generate a sitemap for CST.  Updated Google with the sitemap information at:

https://www.google.com/webmasters/tools/siteoverview

Source:<br />
http://www.hookedonlinq.com/Default.aspx?Page=ScrewturnSitemap&AspxAutoDetectCookieSupport=1

LINQ: .Net nice ref site <br />
<br /> <br />
==XML==
Added in plugin for displaying XML feeds.  Uses an XmlFormatter with templates.  May be useful for other type of XML displays.

http://wiki.webgear.co.nz/Default.aspx?Page=XmlFormatter&AspxAutoDetectCookieSupport=1#Download

RSS
{ xmlf:xml=http://www.chipsofttech.com/RSS.aspx?Page=MainPage,xslt=rss2ul.xsl,params=maxentries=3&maxdescription=200 }

ATOM
{ xmlf:xml=http://blog.webgear.co.nz/Atom.aspx, xslt=atom2ul.xsl, params=maxentries=3&maxdescription=200 }

<br /> 
==Render Pages==
Tried to add RenderPages.cs to my plugins.  Suppose to render all pages for printing.  Did not work.  Will need further investigation.
<br />

==Date Formatter==
A very basic plugin that prints out DateTime.Now using this syntax:

{ sf:Name=DateTimeNowTicks } 
{ sf:Name=DateTimeNowFormat,Format=yyyy } 



http://www.screwturn.eu/forum/viewtopic.php?t=343
