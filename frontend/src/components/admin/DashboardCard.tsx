function DashboardCard({
  title,
  value,
}: {
  title: string;
  value?: number;
}) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-3xl mt-2 font-bold">
        {value ?? "—"}
      </p>
    </div>
  );
}
export default DashboardCard;