import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AuthorSpotlightCarousel() {
  const [index, setIndex] = useState(0);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/team",
          { withCredentials: true }
        );
        setTeam(data.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch team data"
        );
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  const prevAuthor = () => {
    setIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  };

  const nextAuthor = () => {
    setIndex((prev) => (prev === team.length - 1 ? 0 : prev + 1));
  };

  if (loading)
    return <p className="text-center my-20">Loading team spotlight...</p>;
  if (error) return <p className="text-center my-20 text-red-600">{error}</p>;
  if (team.length === 0)
    return <p className="text-center my-20">No team members found.</p>;

  const author = team[index];

  return (
    <section className="max-w-3xl mx-auto my-20 px-4 sm:px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Team Spotlight</h2>

      <Card className="p-6 flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-24 h-24 flex-shrink-0 mx-auto md:mx-0">
          {author.avatar?.url ? (
            <AvatarImage src={author.avatar.url} alt={author.name} />
          ) : (
            <AvatarFallback>
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>

        <CardContent className="p-0 flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold">{author.name.toUpperCase()}</h3>
          <a
            href={`mailto:${author.email}`}
            className="underline text-blue-900 break-words"
          >
            {author.email}
          </a>
          <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
            {author.bio || "No bio available."}
          </p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link to={`/team-profile/${author._id}`}>View Profile</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          onClick={prevAuthor}
          aria-label="Previous author"
          className="p-2 sm:p-3"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          onClick={nextAuthor}
          aria-label="Next author"
          className="p-2 sm:p-3"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
