interface Props {
  name: string;
  description: string;
}

const DepartmentCard: React.FC<Props> = ({ name, description }) => (
  <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
    <h2 className="text-xl font-semibold text-blue-600">{name}</h2>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

export default DepartmentCard;
