import { fetchCategories } from '../lib/data';
import FrontHome from '../ui/home/FrontHome';

export default async function Home() {
  const categories = await fetchCategories();

  return(
    <FrontHome categories={categories} />
  )

};