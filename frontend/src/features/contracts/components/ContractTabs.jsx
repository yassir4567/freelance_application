import styles from "../styles/ContractTabs.module.css";

function ContractTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className={styles.tabLabel}>{tab.label}</span>
          {tab.count !== undefined && (
            <span className={styles.tabCount}>{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default ContractTabs;
