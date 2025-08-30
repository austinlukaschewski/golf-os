import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Ghin = {
  __typename?: 'Ghin';
  clubName?: Maybe<Scalars['String']['output']>;
  handicapIndex?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type Golfer = {
  __typename?: 'Golfer';
  avatar?: Maybe<OptionalMinIoObject>;
  birthdate?: Maybe<Scalars['Date']['output']>;
  country: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  ghin: Ghin;
  handedness: Handedness;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  stateProvince: Scalars['String']['output'];
  stateProvinceCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum Handedness {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type OptionalMinIoObject = {
  __typename?: 'OptionalMinIOObject';
  bucket?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  golfer: Golfer;
  golferId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  password: UserPassword;
  permissions: Array<UserPermission>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserPassword = {
  __typename?: 'UserPassword';
  createdAt: Scalars['DateTime']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isResetting: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserPermission {
  UserAdmin = 'USER_ADMIN'
}

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', username: string, email: string, lastLogin?: any | null, permissions: Array<UserPermission>, golfer: { __typename?: 'Golfer', firstName: string, middleName?: string | null, lastName: string, nickname?: string | null, email?: string | null, phoneNumber?: string | null, birthdate?: any | null, stateProvince: string, stateProvinceCode: string, country: string, countryCode: string, handedness: Handedness, ghin: { __typename?: 'Ghin', id?: number | null, clubName?: string | null, handicapIndex?: number | null }, avatar?: { __typename?: 'OptionalMinIOObject', bucket?: string | null, path?: string | null } | null } } };

export const MeDocument = gql`
    query Me {
  me {
    username
    email
    lastLogin
    permissions
    golfer {
      firstName
      middleName
      lastName
      nickname
      email
      phoneNumber
      birthdate
      stateProvince
      stateProvinceCode
      country
      countryCode
      handedness
      ghin {
        id
        clubName
        handicapIndex
      }
      avatar {
        bucket
        path
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }