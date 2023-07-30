'use client';

import React, {useState} from "react";

function SearchBar
({
   filterText,
   inStockOnly,
   onFilterTextChange,
   onInStockOnlyChange
 }: {
  filterText: string,
  inStockOnly: boolean,
  onFilterTextChange: (value: (((prevState: string) => string) | string)) => void,
  onInStockOnlyChange: (value: (((prevState: boolean) => boolean) | boolean)) => void
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
        placeholder="Search..."
        className="border-2 border-indigo-500 text-black text-l p-1 rounded "/>
      <div>
        <input type="checkbox" id="stock" name="stock"
               className="mr-1 mt-2"
               checked={inStockOnly}
               onChange={e => onInStockOnlyChange(e.target.checked)}/>
        <label htmlFor="stock">Only show products in stock</label>
      </div>
    </form>
  )
}

function ProductTable
({
   products,
   filterText,
   inStockOnly
 }: {
  products: Product[],
  filterText: string,
  inStockOnly: boolean
}) {
  const rows: any[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          title={product.category}
          key={product.category}/>
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}/>
    );
    lastCategory = product.category;
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
        <tr>
          <th
            className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Name
          </th>
          <th
            className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Price
          </th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function ProductCategoryRow({title}: {
  title: string
}) {
  return <tr>
    <th colSpan={2} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {title}
    </th>
  </tr>
}

function ProductRow({product}: {
  product: Product
}) {
  const displayName = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return <tr>
    <td
      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{displayName}</td>
    <td
      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{product.price}</td>
  </tr>
}

function FilterableProductTable({products}: {
  products: Product[]
}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Products</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <SearchBar filterText={filterText}
                           inStockOnly={inStockOnly}
                           onFilterTextChange={setFilterText}
                           onInStockOnlyChange={setInStockOnly}
                />
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <ProductTable products={products}
                          filterText={filterText}
                          inStockOnly={inStockOnly}/>
          </div>
        </div>
      </div>
    </section>
  )
}

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
] as Product[];

export default function ThinkingInReact() {
  return (
    <>
      <FilterableProductTable products={PRODUCTS}/>
    </>
  );
}
