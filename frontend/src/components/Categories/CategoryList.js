import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { PencilAltIcon } from "@heroicons/react/outline";
import { categoriesFetchAction } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import Footer from "../../utils/Footer";
import ErrorDisplay from "../../utils/ErrorDisplay";



const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoriesFetchAction());
  }, [dispatch]);
  const category = useSelector(state => state?.category);

  const { categoryList, loading, appErr, serverErr } = category;

  return (
    <>
      {loading ?
        <LoadingComponent />
        : appErr || serverErr ?
          <ErrorDisplay first={serverErr} second={appErr} />
          : categoryList?.length <= 0 ?
            <ErrorDisplay first={"No categories found."} />
            :
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-custom-gray h-screen">
                  <div className="shadow overflow-hidden mt-1 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Author
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Created At
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList?.map(category => (
                          <tr className="bg-custom-gray-light" key={category?.createdAt}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={category?.user?.profilePhoto}
                                    alt="category profile"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-custom-yellow">
                                    {category?.user?.nickName}
                                  </div>
                                  <div className="text-sm text-white">
                                    {category?.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {category?.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {<DateFormatter date={category?.createdAt} />}
                            </td>
                            <Link to={`/update-category/${category?._id}`}>
                              <td className="px-6 py-4 whitespace-nowrap ">
                                <PencilAltIcon className="h-5 text-custom-blue" />
                              </td>
                            </Link>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
      }
      <Footer />
    </>
  );
};

export default CategoryList;
