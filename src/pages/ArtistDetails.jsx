/* eslint-disable import/no-cycle */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, RelatedSongs } from "../components";
import DetailsHeader from "../components/DetailsHeader";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
