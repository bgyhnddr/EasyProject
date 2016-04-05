using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace 项目定义功能.功能
{
    public class 删除项目
    {
        public void Exec(项目名称类 项目)
        {
            var path = HttpContext.Current.Server.MapPath("~/项目/" + 项目.名称);
            Directory.Delete(path);
        }
    }
}
