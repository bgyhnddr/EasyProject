using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace 基础类库
{
    public class 数据交换类
    {
        public bool success;
        public object data;
        public string errCode;
        public string errMsg;
        public string stack;

        public string ToResponseString()
        {
            return JsonConvert.SerializeObject(this, new Newtonsoft.Json.Converters.StringEnumConverter());
        }

        public static T GetObj<T>(string args)
        {
            return JsonConvert.DeserializeObject<T>(args);
        }

        public static string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}
