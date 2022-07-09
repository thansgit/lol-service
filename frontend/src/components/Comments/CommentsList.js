import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { commentDeleteAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsList({ comments }) {

  const user = useSelector(state => state.users);
  const { userAuth } = user;
  const isLoginUser = userAuth?._id;

  const dispatch = useDispatch();

  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-400">{comments?.length} Comments </div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-custom-yellow text-lg text-center">No comments</h1>
          ) : (
            comments?.map(comment => (
              <>
                <li key={comment?._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Link to={`/profile/${comment?.user?._id}`} className="hover:underline text-custom-green">
                          <h3 className="text-sm font-medium text-custom-green">
                            {comment?.user?.nickName}
                          </h3>
                        </Link>
                        <p className="text-bold text-custom-yellow text-base ml-5">
                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {comment?.description}
                      </p>
                      {/* Check if the same user created this comment */}
                      {isLoginUser === comment?.user?._id ?
                        <p className="flex">
                          <Link className="p-3" to={`/update-comment/${comment?._id}`}>
                            <PencilAltIcon className="h-5 mt-3 text-custom-yellow" />
                          </Link>
                          <button onClick={() => dispatch(commentDeleteAction(comment?._id))} className="ml-3">
                            <TrashIcon className="h-5 mt-3 text-custom-red" />
                          </button>
                        </p> :
                        null}

                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}
