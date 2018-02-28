import { join } from "path";
import { importConfig } from "../src";

const expectConfig = {
    app: {
        locale: "zh-CN",
        name: "website",
        timezone: "Asia/Shanghai",
        url: "http://localhost",
    },
    datebase: {
        host: "127.0.0.1",
        name: "test",
        pass: "root",
        port: 3306,
        user: "root",
    },
};

describe("导入配置", () => {
    it("导入配置应该要和预期一样", () => {
        const config = importConfig(join(process.cwd(), "./config"));
        expect(config).toEqual(expectConfig);
    });
});
