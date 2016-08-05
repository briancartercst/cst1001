Welcome to Brian's Blog
briancarter|2007/12/18 04:40:25
##PAGE##
To keep track of items that I have reseached, my goal is to update this blog with minor & major items of interested focused on ASP.Net using C$.
{BR}

===ASP.Net Tracing===
([^http://www.4guysfromrolla.com/webtech/081501-1.shtml])
{BR}{BR}
Page level: @@<% @Page Trace="[True|False]" %>@@
{BR}{BR}
Website Level:
web.config
@@
<configuration>
  ...
  < system.web>
  ...
    < trace enabled="[true|false]"
       localOnly="[true|false]"
       pageOutput="[true|false]"
       requestLimit="[number]"
       traceMode="[SortByTime|SortByCategory]" 
    />
@@

=====To generate trace meessage=====
Display an informational message: {{Trace.Write(category, message)}}

Display a warning (shown in RED): {{Trace.Warn(category, message)}}

These two statements can be littered throughout your ASP.NET Web page as you see fit. With ASP.NET's Trace.Write and Trace.Warn statements these statements only appear when tracing is enabled. 
{BR}

===ASP.Net Web Service with Soap Header===
<sub>
@@
// Create a new instance of the WS Class
// proxy class used to call the remote .asmx file
ChipSoftTech.General_Services cst = new ChipSoftTech.General_Services();
cst.Url= "http://www.chipsofttech.com/ws/General_Services.asmx";

// Create a new instance of the AuthHeader class
ChipSoftTech.AuthHeader myHeader = new ChipSoftTech.AuthHeader();

myHeader.Username = this.TextBox1.Text;
myHeader.Password = this.TextBox2.Text;

// Set the AuthHeader public member of the
// UsingSoapHeaders class to myHeader
cst.AuthHeaderValue = myHeader;
string strResult = "";

//Call ws method (secure)
try
{
  strResult = cst.GetDateSecure();
  this.Label1.Text = strResult;
}
  catch (Exception ex)
{ 
  this.Label1.Text = ex.StackTrace;
}
@@


{BR}</sub>