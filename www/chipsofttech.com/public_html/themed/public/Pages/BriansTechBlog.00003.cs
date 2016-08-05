Brian's Technical Blog
admin|2007/12/16 07:34:37
##PAGE##
Welcome to Brian's Technical Blog!

==ASP.Net==

===Tracing===
([^http://www.4guysfromrolla.com/webtech/081501-1.shtml])
Page or Web site level (update web.config for web level)

''<trace enabled="[true|false]"
       localOnly="[true|false]"
       pageOutput="[true|false]"
       requestLimit="[number]"
       traceMode="[SortByTime|SortByCategory]" />''

These two methods both expect two String parameters and can be called like so: 

'Display an informational message
''Trace.Write(category, message)''

'Display a warning (shown in RED)
''Trace.Warn(category, message)''

These two statements can be littered throughout your ASP.NET Web page as you see fit. With ASP.NET's Trace.Write and Trace.Warn statements these statements only appear when tracing is enabled. 