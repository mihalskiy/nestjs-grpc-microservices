/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateCommentInput {
    text: string;
    post: string;
}

export interface CreateUserInput {
    text: string;
    post: string;
}

export interface UpdateCommentInput {
    text?: string;
}

export interface UpdateUserInput {
    text?: string;
}

export interface CreatePostInput {
    title: string;
    body: string;
    published: boolean;
}

export interface UpdatePostInput {
    title?: string;
    body?: string;
    published?: boolean;
}

export interface UserInput {
    name: string;
    email: EmailAddress;
    age?: UnsignedInt;
}

export interface LoginUserInput {
    email: EmailAddress;
}

export interface UpdateProfileInput {
    name?: string;
    age?: UnsignedInt;
}
export interface UpdatePasswordInput {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IMutation {
    createNewUser(data: UserInput): UserPayload | Promise<UserPayload>;
    updateUser(id: string, data: UpdateUserInput): UserPayload | Promise<UserPayload>;
    deleteUser(id: string): DeleteUserPayload | Promise<DeleteUserPayload>;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    users(q?: string, first?: number, last?: number, before?: string, after?: string, filterBy?: JSONObject, orderBy?: string): UsersConnection | Promise<UsersConnection>;
    userCount(q?: string, filterBy?: JSONObject): number | Promise<number>;
    me(): User | Promise<User>;
}

export interface ISubscription {
  userCreated(user: string): User | Promise<User>;
}

export interface Comment {
    id: string;
    text: string;
    author: User;
    post: Post;
    createdAt: DateTime;
    updatedAt: DateTime;
    version: number;
}

export interface CommentsConnection {
    edges: CommentEdge[];
    pageInfo: PageInfo;
}

export interface CommentEdge {
    node: Comment;
    cursor: string;
}

export interface CommentPayload {
    errors?: ErrorPayload[];
    comment?: Comment;
}

export interface DeleteCommentPayload {
    errors?: ErrorPayload[];
    count?: number;
}

export interface DeleteUserPayload {
    errors?: ErrorPayload[];
    count?: number;
}

export interface ErrorPayload {
    field?: string;
    message?: string[];
}

export interface PageInfo {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface Post {
    id: string;
    title: string;
    body: string;
    published: boolean;
    author: User;
    comments?: CommentsConnection;
    createdAt: DateTime;
    updatedAt: DateTime;
    version: number;
}

export interface PostsConnection {
    edges: PostEdge[];
    pageInfo: PageInfo;
}

export interface PostEdge {
    node: Post;
    cursor: string;
}

export interface PostPayload {
    errors?: ErrorPayload[];
    post?: Post;
}

export interface DeletePostPayload {
    errors?: ErrorPayload[];
    count?: number;
}

export interface User {
    id: string;
    name: string;
    email: EmailAddress;
    age?: UnsignedInt;
    posts?: PostsConnection;
    comments?: CommentsConnection;
    createdAt: DateTime;
    updatedAt: DateTime;
    version: number;
}

export interface UsersConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
}

export interface UserEdge {
    node: User;
    cursor: string;
}

export interface UserPayload {
    errors?: ErrorPayload[];
    user?: User;
}

export interface DeleteAccountPayload {
    errors?: ErrorPayload[];
    count?: number;
}

export type DateTime = any;
export type EmailAddress = any;
export type UnsignedInt = any;
export type JSONObject = any;
