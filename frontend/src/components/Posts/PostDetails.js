import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { postFetchSingleAction } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";



const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(postFetchSingleAction(id));
  }, [dispatch, id])

  const post = useSelector(state => state?.post);
  const { postDetails, loading, appErr, serverErr } = post
  console.log(postDetails);

  return (
    <>
      {loading ? <div className="h-screen bg-gray-800"><LoadingComponent /></div> :
        appErr || serverErr ? <h1 className="h-screen text-red-400 text-xl">{appErr} - {serverErr}</h1> :
          <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
            <div className="container px-4 mx-auto">
              {/* Post Image */}
              <img
                className="mb-24 w-full h-96 object-cover"
                src={postDetails?.image}
                alt=""
              />
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                  {postDetails?.title}
                </h2>

                {/* User */}
                <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                  <img
                    className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                    src={postDetails?.user?.profilePhoto}
                    alt="img"
                  />
                  <div className="text-left">
                    <h4 className="mb-1 text-2xl font-bold text-gray-50">
                      <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                        {postDetails?.user?.nickName}
                      </span>
                    </h4>
                    <p className="text-gray-500">
                      {<DateFormatter date={postDetails?.createdAt} />}
                    </p>
                  </div>
                </div>
                {/* Post description */}
                <div className="max-w-xl mx-auto">
                  <p className="mb-6 text-left  text-xl text-gray-200">
                    {postDetails?.description}
                    {/* Show delete and update btn if created user */}
                    <p className="flex">
                      <Link className="p-3" to='/'>
                        <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button className="ml-3">
                        <TrashIcon className="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  </p>
                </div>
              </div>
            </div>
            {/* Add comment Form component here */}

            <div className="flex justify-center  items-center">
              {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
              CommentsList
            </div>
          </section>}
    </>
  );
};

export default PostDetails;
