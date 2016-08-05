<INPUT TYPE="button" NAME="button" Value="Click" onClick="PrintResults()">


<script language =javascript>
function PrintResults()
{
var sOption="toolbar=yes,location=no,directories=yes,m enubar=yes,";
sOption+="scrollbars=yes,width=750,height=600,left =100,top=25";

var sWinHTML = document.getElementById('MyTextBox').innerHTML;

var winprint=window.open("","",sOption);
winprint.document.open();
winprint.document.write("<HTML><Head></Head><Body>")
winprint.document.write("<a href='javascript:;'
onClick='window.print();return false'>Print This Page.</a><br>");
winprint.document.write(sWinHTML);
winprint.document.write("</Body></HTML>")
winprint.document.close();
winprint.focus();
}
</script>