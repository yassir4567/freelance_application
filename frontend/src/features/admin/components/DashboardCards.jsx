import styles from "../styles/DashboardCards.module.css";
import SimpleCard from "../../../shared/ui/SimpleCard";

function AdminCards() {
  const dashboardCards = [
    {
      id: 0,
      title: "Total users",
      value: 99,
    },
    {
      id: 1,
      title: "Total Projects",
      value: 99,
    },
    {
      id: 2,
      title: "Total Client",
      value: 99,
    },
    {
      id: 3,
      title: "Total Freelancer",
      value: 99,
    },
    {
      id: 4,
      title: "Projects in progress",
      value: 99,
    },
    {
      id: 5,
      title: "Escrow Amount",
      value: "$999",
    },
  ];
  return (
    <div className={styles.cards}>
      {dashboardCards.map((card) => (
        <SimpleCard key={card.id} className={styles.dashboardCard} title={card.title} value={card.value} />
      ))}
    </div>
  );
}
export default AdminCards;
