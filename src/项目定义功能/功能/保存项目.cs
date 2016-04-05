using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using 基础类库;

namespace 项目定义功能.功能
{
    public class 保存项目
    {
        public void Exec(项目类 项目)
        {
            var path = HttpContext.Current.Server.MapPath("~/项目/" + 项目.项目名称);

            if (!Directory.Exists(path))
            {
                // Create the directory it does not exist.
                Directory.CreateDirectory(path);
            }

            try
            {
                var data = new 项目定义功能.功能.获取项目().Exec(new 项目名称类() { 名称 = 项目.项目名称 });
                if (data.tick != 项目.tick)
                {
                    throw new 项目不是最新异常("项目与保存项目有冲突,请获取最新项目");
                }
                else
                {
                    项目.tick = DateTime.Now.Ticks.ToString();
                    File.WriteAllText(path + "\\" + 项目.项目名称 + "_" + 项目.tick.ToString() + ".json", 数据交换类.Serialize(项目));
                }
            }
            catch (项目定义功能.功能.获取项目.找不到项目异常)
            {
                项目.tick = DateTime.Now.Ticks.ToString();
                File.WriteAllText(path + "\\" + 项目.项目名称 + "_" + 项目.tick.ToString() + ".json", 数据交换类.Serialize(项目));
            }
        }

        [Serializable]
        public class 项目不是最新异常 : Exception
        {
            public 项目不是最新异常()
            {
            }

            public 项目不是最新异常(string message) : base(message)
            {
            }

            public 项目不是最新异常(string message, Exception innerException) : base(message, innerException)
            {
            }

            protected 项目不是最新异常(SerializationInfo info, StreamingContext context) : base(info, context)
            {
            }
        }
    }
}
