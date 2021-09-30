import { IProduct } from "../interfaces";

interface IProps {
	products: IProduct[];
}

const Shop: React.FC<IProps> = ({ products }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>No.</th>
					<th>Product</th>
					<th>Price</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Milk</td>
					<td>5</td>
					<td>
						<button>Add to cart</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

const renderProductTable = (products: IProduct[]) => {
	if (products.length === 0) {
		return <div>Out of stock!</div>
	}
	return (
		<table>
			<thead>
				<tr>
					<th>No.</th>
					<th>Product</th>
					<th>Price</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Milk</td>
					<td>5</td>
					<td>
						<button>Add to cart</button>
					</td>
				</tr>
			</tbody>
		</table>
	)
}

export default Shop;
