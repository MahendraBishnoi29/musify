/* eslint-disable import/no-cycle */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, RelatedSongs } from "../components";
import DetailsHeader from "../components/DetailsHeader";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    playPause(true);
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Searching Releated Songs..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData?.sections[1]?.text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry No Lyrics found! 🙂
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
