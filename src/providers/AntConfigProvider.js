const { ConfigProvider } = require("antd")


const AntConfigProvider = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "var(--primary)",
                    borderRadius: 5,
                    colorBgContainer: 'var(--light-gray)',
                    fontFamily: "Poppins, sans-serif",
                },
                components: {
                    Input: {
                        paddingBlock: 10,
                        borderRadius: 5,
                        colorBgContainer: "var(--light-gray)",
                        activeShadow: "transparent",
                        hoverBorderColor: "transparent",
                        activeBorderColor: "transparent",
                        activeBg: "var(--lavender-mist)",
                        inputFontSize: 16,
                        colorErrorBorder: "var(--red-orange)",
                        colorErrorText: "var(--red-orange)",
                    },
                    Form: {
                        labelFontSize: 18,
                        labelColor: "var(--dark-gray)",
                        paddingBlockEnd: 20,
                    },
                    Modal: {
                        paddingContent: 0,
                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default AntConfigProvider