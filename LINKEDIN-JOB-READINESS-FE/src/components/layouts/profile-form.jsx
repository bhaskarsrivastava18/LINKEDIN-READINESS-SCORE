import { useState } from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";

const ProfileForm = ({ onSubmit }) => {
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [headline, setHeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      headline,                          
      skills: skills.join(", "),         
      experience,
      education,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Box display="flex" flexDirection="column" gap={2.5}>
        <TextField
          label="Headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          fullWidth
        />

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={skills}
          onChange={(_, newValue) => setSkills(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              placeholder="Type a skill and press Enter"
              fullWidth
            />
          )}
        />

        <TextField
          label="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          fullWidth
        />

        <TextField
          label="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <Box display="flex" justifyContent="flex-start" pt={1}>
          <Button type="submit" variant="contained" size="large">
            Analyze Profile
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ProfileForm;