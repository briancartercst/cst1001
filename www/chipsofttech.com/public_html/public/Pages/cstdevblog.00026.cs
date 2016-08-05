CST Portal Dev Blog
admin|2007/10/13 16:26:26
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

StartupTools.cs
public static void Startup() {
...
  KeepAliveInit();
}

//Add time object
private static System.Timers.Timer timer = null;

//Add Keep Alive Init
private static void KeepAliveInit()
{
  if (!Settings.DisableKeepAlive)
  {
     Log.LogEntry("CST Wiki keep alive started: " + DateTime.Now.ToString(), EntryType.General, "SYSTEM");

//in milliseconds, 60000 = 1 minute, * 5 = 5 minutes
     timer = new System.Timers.Timer(60000 * Settings.MaxKeepAlive);
     timer.Elapsed += new System.Timers.ElapsedEventHandler(KeepAlive);
     timer.Start();
   }
}

//Add Keep Alive Event Call
private static void KeepAlive(Object sender, System.Timers.ElapsedEventArgs e)
{
  Log.LogEntry("CST Wiki keep alive event: " + DateTime.Now.ToString(), EntryType.General, "SYSTEM");

  System.Net.WebClient http = new System.Net.WebClient();
  string Result = http.DownloadString(Settings.MainUrl + "default.aspx");
  Result = http.DownloadString(Settings.MainUrl + "admin.aspx");
}





