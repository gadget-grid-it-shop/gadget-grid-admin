const { ConfigProvider } = require("antd")


const AntConfigProvider = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default AntConfigProvider