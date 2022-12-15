/* eslint-disable nonblock-statement-body-position */
/* eslint-disable import/no-cycle */
/* eslint-disable curly */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader />;
  if (isFetching && error) return <Error title="Loading Top Charts..." />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {data?.map((song, i) => (
          <SongCard
            song={song}
            data={data}
            key={song.key}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
