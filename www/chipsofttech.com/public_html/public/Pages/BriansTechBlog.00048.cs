Welcome to Brian's Blog
briancarter|2007/12/18 05:09:18
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
First, create a new ASP.Net Web Service Application.  Add a new Web Service (.asmx).  

There are many ways to secure a web service (http://msdn2.microsoft.com/en-us/library/w67h0dw7.aspx).  In our example, we are using custom SOAP headers.

Custom SOAP headers are useful for both secure and nonsecure Internet scenarios. User credentials are passed within the SOAP header of the SOAP message. The Web server, regardless of the platform hosting the Web service, provides a custom authentication implementation.

SOAP headers are a great way of passing out-of-band or information not related to the semantics of a Web service. Unlike the Body element of a SOAP message, which includes the in and out parameters for the Web service operation that are processed by the Web service method, the Header element is optional and can thus be processed by the infrastructure. That is, processed by infrastructure developed to provide a custom authentication mechanism.

In the web service, first add an authentication class derived from SoapHeader:
<sub>
@@

// AuthHeader class extends from SoapHeader
public class AuthHeader : SoapHeader
{
    public string Username;
    public string Password;
}

@@
</sub>

Next, create the web service method.  
<sub>
@@
[WebService(Description = "Simple sample to demonstrate use of SOAP Headers", 
            Namespace = "http://chipsofttech.com/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ToolboxItem(false)]
public class General_Services : System.Web.Services.WebService
{
    public AuthHeader sHeader;

    [WebMethod(Description = "Secure Request for the server's current date and time.")]
    [SoapHeader("sHeader")]
    public string GetDateSecure()
    {
        if (sHeader == null)
            return "ERROR: Please supply credentials";

        string usr = sHeader.Username;
        string pwd = sHeader.Password;

        //AuthenticateUser is developer defined method to check credentials.
        if (AuthenticateUser(usr, pwd))
        {
            return System.DateTime.Now.ToString();
        }
        else
        {
            return "ERROR: Could not authenticate";
        }

    }
</sub>
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