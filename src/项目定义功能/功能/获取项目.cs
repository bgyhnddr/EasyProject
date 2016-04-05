using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace 项目定义功能.功能
{
    public class 获取项目
    {
        public class 找不到项目异常 : Exception
        {
            public 找不到项目异常() : base()//调用基类的构造器
            {
            }
            public 找不到项目异常(string message) : base(message)//调用基类的构造器
            {
            }
        }

        public 项目类 Exec(项目名称类 项目)
        {
            var path = HttpContext.Current.Server.MapPath("~/项目/" + 项目.名称);

            if (!Directory.Exists(path))
            {
                // Create the directory it does not exist.
                Directory.CreateDirectory(path);
            }

            var query = (from f in Directory.GetFiles(path)
                         let fi = new FileInfo(f)
                         orderby fi.CreationTime descending
                         select fi.FullName).ToList();
            if (query.Count > 0)
            {
                return 基础类库.数据交换类.GetObj<项目类>(File.ReadAllText(query[0]));
            }
            else
            {
                throw new 找不到项目异常("找不到项目");
            }
        }
    }
}
