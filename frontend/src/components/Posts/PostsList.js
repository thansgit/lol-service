import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { postFetchAllAction, postToggleAddEmpathicVote, postToggleAddEgoicVote } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import { categoriesFetchAction } from "../../redux/slices/category/categorySlice";
import LoadingComponent from "../../utils/LoadingComponent";
import Footer from "../../utils/Footer";
import ErrorDisplay from "../../utils/ErrorDisplay";
export default function PostsList() {

  const dispatch = useDispatch();

  const post = useSelector(state => state?.post);
  const { postList, serverErr, appErr, empathicVotes, egoicVotes } = post;

  const categories = useSelector(state => state?.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = categories;
  //Fetch posts
  useEffect(() => {
    dispatch(postFetchAllAction(''));
  }, [dispatch, empathicVotes, egoicVotes]);
  //Fetch categories
  useEffect(() => {
    dispatch(categoriesFetchAction());
  }, [dispatch]);


  return (
    <>
      <section>
        <div className="py-20 bg-custom-gray min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              <div className="w-full lg:w-1/2">
                <span className="text-custom-yellow font-bold">
                  Latest posts from your fellow beings
                </span>
                <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest post
                </h2>
              </div>
              <div className=" block text-right w-1/2">
                {/* View All */}
                <button
                  onClick={() => dispatch(postFetchAllAction(''))}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-custom-yellow text-black font-bold ">
                  View all posts
                </button>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-custom-gray-light shadow rounded">
                  <h4 className="mb-4 text-gray-300 text-center font-bold uppercase border-b border-custom-red">
                    Categories
                  </h4>
                  <ul>
                    {catLoading ? <LoadingComponent /> : catAppErr || catServerErr
                      ? <h1>{catServerErr} - {catAppErr}</h1> : categoryList?.length <= 0 ? <h1 className="text-white">No categories found</h1>
                        : categoryList?.map((category) => (
                          <li key={category.createdAt}>
                            <p
                              onClick={() => dispatch(postFetchAllAction(category.title))}
                              className="block cursor-pointer py-2 px-3 mb-4 rounded
                             text-custom-yellow font-bold">
                              {category?.title}
                            </p>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-3/4 px-3">
                {/* Posts */}
                {appErr || serverErr ?
                  <ErrorDisplay first={appErr} second={serverErr} /> :
                  postList?.length <= 0 ?
                    <ErrorDisplay first='No posts found...' /> :
                    postList?.map((post) => (
                      <div key={post.id} className="flex flex-wrap bg-custom-gray -mx-3  lg:mb-6">
                        <div className="mb-10  w-full lg:w-1/4">
                          <Link to='/'>
                            {/* Post image */}
                            <img
                              className="w-full h-full object-cover rounded"
                              src={post?.image}
                              alt=""
                            />
                          </Link>
                          {/* Likes, views dislikes */}
                          <div className="flex flex-row bg-custom-gray-light  border-b-2 border-custom-yellow justify-center w-full  items-center ">
                            {/* Likes */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              {/* Toggle like  */}
                              <div className="">
                                <ThumbUpIcon
                                  onClick={() => dispatch(postToggleAddEmpathicVote(post?.id))}
                                  className="h-7 w-7 text-custom-blue cursor-pointer"
                                />
                              </div>
                              <div className="pl-2 text-white">{post?.empathicVotes?.length}</div>
                            </div>
                            {/* Dislike */}
                            <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <ThumbDownIcon
                                  onClick={() => dispatch(postToggleAddEgoicVote(post?.id))}
                                  className="h-7 w-7 cursor-pointer text-custom-red" />
                              </div>
                              <div className="pl-2 text-white">{post?.egoicVotes?.length}</div>
                            </div>
                            {/* Views */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <EyeIcon className="h-7 w-7  text-white" />
                              </div>
                              <div className="pl-2 text-white">
                                {post?.numOfViews}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          <Link className="hover:underline" to='/'>
                            <h3 className="mb-1 text-2xl text-custom-yellow font-bold font-heading">
                              {(post?.title)}
                            </h3>
                          </Link>
                          <p className="text-gray-300">{post?.description}</p>
                          {/* Read more */}
                          <Link className="text-custom-blue hover:underline" to={`/posts/${post?.id}`}>
                            Read More..
                          </Link>
                          {/* User Avatar */}
                          <div className="mt-6 flex items-center">
                            <div className="flex-shrink-0">
                              <Link to='/'>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={post?.user?.profilePhoto}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-custom-gray">
                                <Link className="text-custom-yellow hover:underline " to={`/profile/${post?.user?._id}`}>
                                  {post?.user?.nickName}
                                </Link>
                              </p>
                              <div className="flex space-x-1 text-sm text-custom-green">
                                <time>
                                  {<DateFormatter date={post?.createdAt} />}
                                </time>
                                <span aria-hidden="true">&middot;</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
