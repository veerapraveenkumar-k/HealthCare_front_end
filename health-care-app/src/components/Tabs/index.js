import './index.css'

const Tabs = props => {
    const {key, tab, activeTab, onTabChange} = props
    const activeTabClass = activeTab === tab.tabId ? 'active-tab': ''

    const onTab = () => {
        onTabChange(tab.tabId)
    }

    return (
        <p className={`tab-container ${activeTabClass}`} id={key} onClick={onTab}>
            {tab.displayText}
        </p>
    )
}

export default Tabs