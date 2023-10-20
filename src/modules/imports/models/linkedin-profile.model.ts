import { DefaultModel } from "@/modules/common/shared/models";
import { State } from "@/modules/customers/entities/customer.entity";
import { LanguageLevel } from "../../professional-profiles/languages/constants";
import { BooleanStatus } from "../../professional-profiles/profiles/contansts";

export type LinkedinOfficesData = {
    name: string;
    duration: string;
    location: string;
    description: string;
}
export type LinkedinExpererienceData = {
    title: string;
    offices: LinkedinOfficesData[];
}

export type LinkedinEducationData = {
    title: string;
    course: string;
    period: string;
}
export type LinkedinProfileSkill = {
    skill: string;
}

export type LinkedinProfileContact = {
    sites: string;
    email: string;
    conected: string;
    phone: string;
    address: string;
    birthday: string;
}
export type LinkedinProfile = {
    name: string;
    description: string;
    about: string;
    location: string;
    experiences: LinkedinExpererienceData[];
    education: LinkedinEducationData[];
    skills?: LinkedinProfileSkill[];
    contact?: LinkedinProfileContact;
    profileImage: string;
}

export type ExperienceModel = {
    company: string;
    position: string;
    initial_date: string;
    end_date: string;
    current_position: string;
    offices: OfficeModel[];
};

export type OfficeModel = {
    name: string;
    duration: string;
    location: string;
    description: string;
    initial_date: string;
    end_date: string;
    current_position: string;
};

export type FormationModel = {
    institution: string;
    course: string;
    initial_date: string;
    end_date: string;
};

export type LanguageModel = {
    language: string;
    level: LanguageLevel;
};

export type ReferenceModel = DefaultModel & {
    description: string;
    link: string;
    profile_id: string;
};

export type SocialMediaModel = {
    type: string;
    link: string;
};

export type TagModel = {
    name: string;
};

export type TagsToProfileModel = {
    experience_time: string;
    tag: TagModel;
};

export type AttachmentModel = DefaultModel & {
    name: string;
    url: string;
    profile_id: string;
    profile?: ProfileModel;
};

export type ProfileModel = {
    name: string;
    phone?: string | null;
    email?: string | null;
    birthdate?: Date;
    state: string;
    city: string;
    clt_claim: number;
    pj_claim: number;
    professional_title: string;
    professional_about: string;
    homeoffice?: BooleanStatus;
    // created_by: string;
    address_id: string,
    experiences: ExperienceModel[];
    formations: FormationModel[];
    languages?: LanguageModel[];
    social_medias?: SocialMediaModel[];
    photo_url?: string;
    open_to_work?: BooleanStatus;
    tags?: TagsToProfileModel[];
    tag_names?: string[];
    extration_ref?: Date;
};