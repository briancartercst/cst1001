using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Net.Mail;
using System.Configuration;
using System.Web.Configuration;
using System.Net.Configuration;

namespace ActiveWebService
{
    /// <summary>
    /// Summary description for mailservice
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class mailservice : System.Web.Services.WebService
    {

        [WebMethod]
        public string SendMail(string Email, string Name, string Phone, string ContactInterest, string ContactMessage)
        {
            int port = 0;
            string host = string.Empty;
            string password = string.Empty;
            string username = string.Empty;
            string forwardEmail = string.Empty;
			string contactSubject = string.Empty;

            //Configuration configurationFile = WebConfigurationManager.OpenWebConfiguration("~\\Web.config");

            //MailSettingsSectionGroup mailSettings = configurationFile.GetSectionGroup("system.net/mailSettings") as MailSettingsSectionGroup;
            //if (mailSettings != null)
            //{
                port = int.Parse(WebConfigurationManager.AppSettings["ContactPort"]);
                host = WebConfigurationManager.AppSettings["ContactHost"];
                password = WebConfigurationManager.AppSettings["ContactPassword"];
                username = WebConfigurationManager.AppSettings["ContactUserName"];
                forwardEmail = WebConfigurationManager.AppSettings["ContactForwardEmail"];
                forwardEmail = WebConfigurationManager.AppSettings["ContactForwardEmail"];				
				contactSubject = WebConfigurationManager.AppSettings["ContactSubject"];
            //}

            //create the mail message
            MailMessage mail = new MailMessage();
            //set the addresses
            mail.From = new MailAddress(username);            
            mail.To.Add('kenny.kurtz@iappfusion.com');
            //set the content
            mail.Subject = contactSubject;
            mail.IsBodyHtml = true;
            mail.Body = "<b>Name</b>: " + Name + "<br />"
                + "<b>Email</b>: " + Email + "<br />"
                + "<b>Phone</b>: " + Phone + "<br />"
                + "<b>Interest</b>: " + ContactInterest + "<br />"
                + "<b>DateStamp</b>: " + System.DateTime.Now.ToString() + "<br />"
                + "<b>Messsage</b>: " + ContactMessage + "<br />";
            //send the message
            SmtpClient smtp = new SmtpClient();
            smtp.Host = host;
            smtp.Port = port;
            smtp.EnableSsl = false;
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(username, password);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = basicAuthenticationInfo;
            smtp.Send(mail);

            return "success";

        }
    }


}
