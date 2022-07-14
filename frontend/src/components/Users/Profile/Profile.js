import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import {
  userFetchProfileAction,
  userFollowProfileAction,
  userUnfollowProfileAction
} from "../../../redux/slices/users/usersSlices";
import DateFormatter from "../../../utils/DateFormatter";
import LoadingComponent from "../../../utils/LoadingComponent";
import Footer from "../../../utils/Footer";
import ErrorDisplay from "../../../utils/ErrorDisplay";

export default function Profile() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector(state => state.users);
  const {
    profile,
    profileLoading,
    profileAppErr,
    profileServerErr,
    followed,
    unFollowed,
    userAuth,
  } = user;

  useEffect(() => {
    dispatch(userFetchProfileAction(id))
  }, [dispatch, id, followed, unFollowed])

  console.log(profile?.postCount)

  const isLoggedInUser = userAuth?._id === profile?._id;

  return (
    <>
      <div className="min-h-screen bg-custom-gray flex justify-center items-center" >
        {profileLoading ? <LoadingComponent />
          : profileAppErr || profileServerErr ? <ErrorDisplay first={profileServerErr} second={profileAppErr} />
            : <div className="h-screen flex overflow-hidden bg-custom-gray">
              {/* Static sidebar for desktop */}

              <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <div className="flex-1 relative z-0 flex overflow-hidden">
                  <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                    <article>
                      {/* Profile header */}
                      <div>
                        <div>
                          <img
                            className="h-32 w-full object-cover lg:h-48"
                            src={profile?.profilePhoto}
                            alt={profile?.nickName}
                          />
                        </div>
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                            <div className="flex mb-20">
                              <img
                                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                src={profile?.profilePhoto}
                                alt={profile?.nickName}
                              />
                            </div>
                            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                              <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                                <h1 className="text-2xl font-bold text-white ">
                                  {profile?.nickName}
                                  {" "}
                                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-custom-yellow text-custom-gray-light">
                                    {profile?.accountType}
                                  </span>
                                  {/* Display if verified or not */}
                                  {profile?.isAccountVerified ? <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                    Account Verified
                                  </span> : <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-custom-red text-gray-300">
                                    Unverified Account
                                  </span>}
                                </h1>
                                <p className="m-3 text-lg text-white">
                                  Date Joined:{" "}
                                  <DateFormatter date={profile?.createdAt} />{" "}
                                </p>
                                <p className="text-custom-green mt-2 mb-2">
                                  {profile?.posts?.length} posts{" "}
                                  {profile?.followers?.length} followers{" "}
                                  {profile?.following?.length} following
                                </p>
                                {/* Who view my profile */}
                                <div className="flex items-center  mb-2">
                                  <EyeIcon className="h-5 w-5 fill-white" />
                                  <div className="pl-2 text-white">
                                    {profile?.viewedBy?.length}{" "}
                                    <span className="text-custom-blue cursor-pointer hover:underline">
                                      users viewed your profile
                                    </span>
                                  </div>
                                </div>

                                {/* Upload profile photo */}
                                {isLoggedInUser && <Link
                                  to={`/upload-profile-photo`}
                                  className="inline-flex justify-center w-48 px-4 py-2 border border-custom-yellow shadow-sm text-sm font-medium rounded-md text-custom-yellow bg-custom-gray-light hover:bg-custom-gray-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <UploadIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                  <span>Set profile photo</span>
                                </Link>}

                              </div>

                              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                {/* // Hide follow button if the user is viewing own profile*/}
                                {isLoggedInUser ? null : <div>
                                  {profile?.isFollowing ? (
                                    <button
                                      onClick={() =>
                                        dispatch(userUnfollowProfileAction(id))
                                      }
                                      className="mr-2 inline-flex justify-center px-4 py-2 border border-custom-yellow shadow-sm text-sm font-medium rounded-md text-custom-yellow bg-custom-gray-light hover:bg-custom-gray-hover"
                                    >
                                      <EmojiSadIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Unfollow</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        dispatch(userFollowProfileAction(id))
                                      }
                                      type="button"
                                      className="inline-flex justify-center px-4 py-2 border border-custom-yellow shadow-sm text-sm font-medium rounded-md text-custom-yellow bg-custom-gray-light hover:bg-custom-gray-hover"
                                    >
                                      <HeartIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                      <span>Follow </span>
                                      <span className="pl-2">
                                        {profile?.followers?.length}
                                      </span>
                                    </button>
                                  )}

                                </div>}

                                {/* Update Profile */}

                                <>
                                  {isLoggedInUser && <Link
                                    to={`/update-profile/${profile?._id}`}
                                    className="inline-flex justify-center px-4 py-2 border border-custom-yellow shadow-sm text-sm font-medium rounded-md text-custom-yellow bg-custom-gray-light hover:bg-custom-gray-hover"
                                  >
                                    <UserIcon
                                      className="-ml-1 mr-2 h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                    <span>Update Profile</span>
                                  </Link>}

                                </>
                                {/* Send Mail */}
                                <button
                                  onClick={() => navigate(`/send-email/${profile?.email}`)}
                                  className="inline-flex justify-center bg-custom-gray-light px-4 py-2 border border-custom-yellow shadow-sm text-sm font-medium rounded-md  hover:bg-custom-gray-hover"
                                >
                                  <MailIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                  <span className="text-base mr-2  text-bold text-custom-yellow">
                                    Send Message
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                          <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2 text-white">
                            Users viewed profile: {profile?.viewedBy?.length}
                          </h1>

                          {/* Who viewed my post */}
                          <ul className="">
                            {profile?.viewedBy?.length <= 0 ? <ErrorDisplay first = { "No viewers..." } />
                            :
                              profile?.viewedBy?.map((viewer) => {
                                return <Link key={viewer._id} to={`/profile/${viewer._id}`}>
                              <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                <img
                                  className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                  src={viewer?.profilePhoto}
                                  alt={viewer?._id}
                                />
                                <div className="font-medium text-lg leading-6 space-y-1">
                                  <h3 className="text-custom-green">
                                    {viewer?.nickName}
                                  </h3>
                                  <p className="text-custom-blue">
                                    {viewer?.accountType}
                                  </p>
                                </div>
                              </div>
                            </Link>
                              })}
                          </ul>
                        </div>
                        {/* All my Post */}
                        <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                          <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2 text-white">
                            My posts - {profile?.posts?.length}
                          </h1>
                          {/* Loo here */}
                          {profile?.posts?.length <= 0 ? <ErrorDisplay first = { "No posts found..." } /> :
                            profile?.posts?.map(post => (
                              <div key={post?._id} className="flex flex-wrap  -mx-3 mt-3  lg:mb-6">
                                <div className="mb-2   w-full lg:w-1/4 px-3">
                                  <Link to={`/posts/${post?._id}`}>
                                    <img
                                      className="object-cover h-40 rounded"
                                      src={post?.image}
                                      alt="poster"
                                    />
                                  </Link>
                                </div>
                                <div className="w-full lg:w-3/4 px-3">
                                  <Link
                                    to={`/posts/${post?._id}`}
                                    className="hover:underline"
                                  >
                                    <h3 className="mb-1 text-2xl text-custom-green font-bold font-heading">
                                      {post?.title}
                                    </h3>
                                  </Link>
                                  <p className="text-white truncate">
                                    {post?.description}
                                  </p>
                                  {/* Read more */}
                                  <Link
                                    className="text-custom-blue hover:underline"
                                    to={`/posts/${post?._id}`}
                                  >Read more...</Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </article>
                  </main>
                </div>
              </div>
            </div>}

      </div>
      <Footer />

    </>
  );
}
