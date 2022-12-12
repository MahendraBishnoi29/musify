/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */

import { Link } from "react-router-dom";

/* eslint-disable quotes */
const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
        <div className="absolute inset-0 flex items-center">
          <img
            src={
              artistId
                ? artist.artwork?.DetailsHeader.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            alt="art"
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link
                className="text-base text-gray-400 mt-3"
                to={`/artists/${songData?.artists[0]?.adamid}`}
              >
                {songData?.subtitle}
              </Link>
            )}
            <p className="text-gray-400 text-base mt-2">
              Genre:{" "}
              {artistId ? artist?.genreName[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
