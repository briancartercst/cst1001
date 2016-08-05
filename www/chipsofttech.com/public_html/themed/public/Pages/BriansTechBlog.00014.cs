Brian's Technical Blog
briancarter|2007/12/16 07:48:45
##PAGE##
Welcome to Brian's Technical Blog!

==Welcome to Brian's ASP.Net Blog==
{BR}{BR}



==ASP.Net Tracing==
([^http://www.4guysfromrolla.com/webtech/081501-1.shtml])
{BR}{BR}
Page or Web site level (update web.config for web level)

{{{{
< trace enabled="[true|false]"
       localOnly="[true|false]"
       pageOutput="[true|false]"
       requestLimit="[number]"
       traceMode="[SortByTime|SortByCategory]" 
/>
}}}}
<sub>''Note: remove the space before the trace command.  ''</sub>

To generate trace meessage: 

Display an informational message
{{Trace.Write(category, message)}}

Display a warning (shown in RED)
{{Trace.Warn(category, message)}}

These two statements can be littered throughout your ASP.NET Web page as you see fit. With ASP.NET's Trace.Write and Trace.Warn statements these statements only appear when tracing is enabled. 